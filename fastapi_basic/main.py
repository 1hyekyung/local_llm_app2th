from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl
import uvicorn
from dto import UserCreate, UserResponse
 
app = FastAPI()

# 요청 데이터 모델 정의
class UserCreate(BaseModel):
    name: str
    password: str
    avatar_url: Optional[HttpUrl] = None

# 응답 데이터 모델 정의
class UserResponse(BaseModel):
    name: str
    avatar_url: Optional[HttpUrl] = None

# http://127.0.0.1:8000/
@app.get("/")
def read_root():
    word = "안녕"
    # 비즈니스 로직 처리
    # DB 조회
    # AI와 통신한 결과
    return {"Hello": word}

@app.get("/item")
def get_item(limit: int = 100): # 타입 힌트 추가
    # 비즈니스 로직처리
    return {"item_id": limit}

# 경로 매개 변수
# http://127.0.0.1:8000/items/1
# http://127.0.0.1:8000/items/2
# http://127.0.0.1:8000/items/3
# http://127.0.0.1:8000/items/5
# http://127.0.0.1:8000/items/6

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.get("/users/{user_id}")
def get_user(user_id):
    # 비즈니스로직 처리
    return {"user_id": user_id}


@app.post("/items/{item_id}")
def read_item(item_id:int, q: str | None = None):
    print(f"item_id : {item_id}, q : {q}  ")
    return {"item_id": item_id, "q": q}






@app.post("/user_info", response_model=UserResponse)
def get_user(user: UserCreate):
    # 비즈니스 로직
    print("user:", user)

    user_info = UserResponse(
        name=user.name,
        avatar_url=user.avatar_url
    )

    return user_info
   
if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)