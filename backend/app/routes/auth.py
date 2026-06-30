from fastapi import APIRouter, HTTPException, Response
from app.schemas.user import UserLoginSchema
from ..security import security, config

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login")
def login(creds: UserLoginSchema, response: Response):
    if creds.username == "admin" and creds.password == "admin":
        token = security.create_access_token(uid="12345")
        response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
        return {"access_token": token}

    return HTTPException(status_code=401, detail="Incorrect username or password")
