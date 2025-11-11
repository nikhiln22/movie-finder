# Movie Search and Favourites

This project is a movie search application where users can search for movies and add or remove them from a favourites list.  
The movie data is fetched from the **OMDB API**, and the favourites are stored on the **server side** using an in-memory Map data structure.

Both the **frontend (React)** and **backend (Node + Express)** are built using **TypeScript**.

---

## Features

- Search movies by title using the OMDB API  
- Debounced search to reduce unnecessary API requests  
- Add and Remove movies from Favourites  
- Favourites stored on the server side (temporary in-memory storage)
- Clean and functional UI

---

## Tech Stack

| Part | Technology |
|------|------------|
| Frontend | React + TypeScript |
| Backend | Node.js + Express + TypeScript |
| Storage | In-memory Map (temporary storage) |
| External API | OMDB Movie API |

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-link>
cd <project-folder>
