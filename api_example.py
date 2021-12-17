from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

threads_list = []
posts_list = []


@app.get("/thread/{threadId}")
def read_thread(threadId: str):
    for thread in threads_list:
        if thread["id"] == threadId:
            return thread
    return "Not found"


@app.get("/threads")
def read_threadlist():
    return {"threads": threads_list}


@app.get("/posts")
def read_postslist():
    return {"posts": posts_list}


@app.get("/posts/{postId}/answers")
def read_answers(postId):
    for post in posts_list:
        if post["id"] == postId:
            return post["children"]
    return "Not found"


@app.get("/posts/{postId}")
def get_specific_post(postId: str):
    for post in posts_list:
        if post["id"] == postId:
            return post
    return "Not found"


@app.get("/posts/{postId}/reactions")
def get_reaction_post(postId):
    return {
        "data": [
            {
                "postId": postId,
                "author": "32ad2cdb-22a2-48aa-a42c-1c53a9afc4bd",
                "value": -1,
            }
        ]
    }


@app.get("/categories")
def get_categorie():
    return {"data": ["Informatique", "Électronique"]}


@app.post("/posts/{postId}/answers")
def post_answer(postId, answer: dict):
    for post in posts_list:
        if post["id"] == postId:
            post["children"].append(answer["id"])
            posts_list.append(answer)
            return post
    return "Not found"


@app.post("/threads")
def post_thread(thread: dict):
    thread["id"] = str(uuid.uuid4())
    threads_list.append(thread)
    posts_list.append(thread["first_post"])
    return thread


@app.patch("/posts/{postId}")
def patch_update_post(postId):
    return {
        "id": postId,
        "title": "string",
        "first_post": {
            "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
            "content": "string",
            "upvotes": 0,
            "downvotes": 0,
            "datePosted": "2019-08-24T14:15:22Z",
            "dateModified": "2019-08-24T14:15:22Z",
            "authorId": "ee6f7132-bd0a-4fcd-83b3-a8022377067b",
            "parent": "42e2bc1b-6741-4e2e-b138-97b4a342c999",
            "children": ["497f6eca-6276-4993-bfeb-53cbbbba6f08"],
        },
        "tags": ["string"],
        "category": "string",
        "answered": False,
    }


@app.delete("/posts/{postId}")
def delete_message(postId):
    return "Post was successfully deleted {postId}"


@app.put("/posts/{postId}/reactions")
def set_own_reaction(postId, value: dict):
    for post in posts_list:
        if post["id"] == postId:
            if value["value"] == 1:
                post["upvotes"] = post["upvotes"] + 1
            elif value["value"] == -1:
                post["downvotes"] = post["downvotes"] + 1
            return post
    return "Not found"


@app.delete("/posts/{postId}/reactions")
def delete_reaction(postId):
    return f"deleted {postId}"


@app.patch("/threads/{threadId}")
def patch_update_thread(threadId):
    return {
        "id": threadId,
        "title": "string",
        "first_post": {
            "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
            "content": "string",
            "upvotes": 0,
            "downvotes": 0,
            "datePosted": "2019-08-24T14:15:22Z",
            "dateModified": "2019-08-24T14:15:22Z",
            "authorId": "ee6f7132-bd0a-4fcd-83b3-a8022377067b",
            "parent": "42e2bc1b-6741-4e2e-b138-97b4a342c999",
            "children": ["497f6eca-6276-4993-bfeb-53cbbbba6f08"],
        },
        "tags": ["string"],
        "category": "string",
        "answered": False,
    }


@app.delete("/threads/{threadId}")
def delete_thread():
    return "Thread was successfully deleted {threadId}"
