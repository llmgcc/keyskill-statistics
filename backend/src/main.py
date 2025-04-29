from fastapi import FastAPI, Request
from src.keyskills.router import router as skills_router
from src.highlights.router import router as highlights_router
from src.categories.router import router as categories_router
from src.technologies.router import router as technologies_router
from src.main_page.router import router as main_router
from src.charts.router import router as charts_router
import time
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="./src/static"), name="static")


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    print(f"Request started: {request.method} {request.url.path}")
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    print(
        f"Request completed: {request.method} {request.url.path} - Time: {process_time:.4f} sec"
    )
    return response


app.include_router(skills_router, prefix="/api")
app.include_router(highlights_router, prefix="/api")
app.include_router(categories_router, prefix="/api")
app.include_router(technologies_router, prefix="/api")
app.include_router(main_router, prefix="/api")
app.include_router(charts_router, prefix="/api")
