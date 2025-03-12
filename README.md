# docker-compose.yml file created ouside in a folder that holds both frontend and backend

services:
  db:
    image: postgres:15
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: django_app
    restart: always
    depends_on:
      - db
    ports:
      - "8000:8000"
    env_file:
      - .env  # Load environment variables from .env file
    volumes:
      - ./backend:/app
    
  frontend:
    build:
      context: ./frontend
    container_name: react_app
    restart: always
    depends_on:
      - backend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    env_file:
      - .env  # Load environment variables from .env file

volumes:
  postgres_data:


# .env file general for the docker-compose.yml
DB_NAME=mydatabase
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=db
DB_PORT=5432

REACT_APP_API_URL=http://localhost:8000