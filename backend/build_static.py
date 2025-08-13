from src.general.router import router as main_router
import asyncio
from build_static_utils import (
    build_skills_related,
    build_skills_similar,
    copy_images_folder,
    build_static_from_route,
    build_domains,
    build_categories,
    build_skills,
)


async def build():
    await copy_images_folder()
    await build_static_from_route(main_router)
    await build_skills()
    await build_domains()
    await build_categories()
    await build_skills_related()
    await build_skills_similar()


asyncio.run(build())
