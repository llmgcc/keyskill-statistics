from PIL import Image
import requests
from io import BytesIO
from sqlmodel import Session, select
from src.models import KeySkill, KeySkillImage
from src.database import engine
import hashlib
import os
import re

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
}

def upload_image(skill_name, url):
    response = requests.get(url, headers=headers)
    blob = BytesIO(response.content)
    img = Image.open(blob)
    img.thumbnail((64,64), Image.ANTIALIAS)

    delete_image(skill_name)

    name = hashlib.shake_128(skill_name.encode('utf-8')).hexdigest(8)
    path = f'{name}.webp'
    
    with Session(engine) as session:
        key_skill_image = KeySkillImage(name=skill_name, image=path)
        session.add(key_skill_image)
        session.commit()
        
    img.save(f'{os.path.dirname(os.path.abspath(__file__))}/src/static/{path}', "webp")

def set_name(skill_name, file_name):
    delete_image(skill_name)
    
    with Session(engine) as session:
        statement = select(KeySkillImage).where(KeySkillImage.name == file_name)
        record = session.exec(statement).first()
        if record:
            new_image = KeySkillImage(name=skill_name, image=record.image)
            session.add(new_image)
            session.commit()

def delete_image(skill_name):
    with Session(engine) as session:
        statement = select(KeySkillImage).where(KeySkillImage.name == skill_name)
        record = session.exec(statement).first()
        if record:
            session.delete(record)
            session.commit()

def set_name_by_regex(pattern, file_name):
    with Session(engine) as session:
        statement = select(KeySkill.name).distinct()
        results = session.exec(statement).all()
        
        matches = [s for s in results if re.search(pattern, s, re.IGNORECASE)]
        
        print(f"Skills matching pattern '{pattern}':")
        for skill in matches:
            print(f"- {skill}")

        for match in matches:
            if match != file_name:
                set_name(match, file_name)


