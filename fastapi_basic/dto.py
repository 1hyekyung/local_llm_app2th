from typing import Optional

from pydantic import BaseModel, HttpUrl


# ==============================
# 요청(Request) DTO
# ==============================
class UserCreate(BaseModel):
    """
    사용자 생성 요청 DTO
    """
    name: str
    password: str
    avatar_url: Optional[HttpUrl] = None


# ==============================
# 응답(Response) DTO
# ==============================
class UserResponse(BaseModel):
    """
    사용자 조회 응답 DTO
    """
    name: str
    avatar_url: Optional[HttpUrl] = None