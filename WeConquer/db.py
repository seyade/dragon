from __future__ import annotations
from dotenv import load_dotenv
import os
import httpx

load_dotenv()
timeout = httpx.Timeout(10.0, read=None)


async def db(path: str, data: dict | list | None = None, method: str = "get"):
  Headers = {
    "apikey": os.environ['SUPA_SERVICE_ROLE'],
    "Authorization": f"Bearer {os.environ['SUPA_SERVICE_ROLE']}",
    "Content-Type": "application/json",
    "Prefer": "missing=default, return=representation"
  }
  async with httpx.AsyncClient() as client:
    if method == "post":
      r = await client.post(os.environ['SUPA_URL'] + "/" + path,
                            headers=Headers,
                            json=data,
                            timeout=timeout)
    elif method == "get":

      r = await client.get(os.environ['SUPA_URL'] + "/" + path,
                           headers=Headers,
                           timeout=timeout)
    elif method == "patch":
      r = await client.patch(os.environ['SUPA_URL'] + "/" + path,
                             headers=Headers,
                             json=data,
                             timeout=timeout)

  return r
