# backend/seed_data.py
"""
Скрипт для заполнения базы тестовыми заявками.
"""

from app.database import SessionLocal, init_db
from app.models.application import (
    Application,
    ApplicationStatus,
    ApplicationPriority,
)


def create_applications(db):
    applications_data = [
        {
            "title": "Fix login bug",
            "description": "Users cannot log in with Google OAuth.",
            "status": ApplicationStatus.new,
            "priority": ApplicationPriority.high,
        },
        {
            "title": "Add dark mode",
            "description": "Implement dark/light theme switching.",
            "status": ApplicationStatus.in_progress,
            "priority": ApplicationPriority.normal,
        },
        {
            "title": "Optimize database",
            "description": "Improve slow SQL queries and add indexes.",
            "status": ApplicationStatus.in_progress,
            "priority": ApplicationPriority.high,
        },
        {
            "title": "Write API documentation",
            "description": "Complete docs for all endpoints.",
            "status": ApplicationStatus.done,
            "priority": ApplicationPriority.low,
        },
        {
            "title": "Refactor auth service",
            "description": "Split auth logic into separate service layer.",
            "status": ApplicationStatus.new,
            "priority": ApplicationPriority.normal,
        },
        {
            "title": "Set up CI/CD",
            "description": "Configure GitHub Actions pipeline.",
            "status": ApplicationStatus.done,
            "priority": ApplicationPriority.high,
        },
    ]

    for application_data in applications_data:
        application = Application(**application_data)
        db.add(application)

    db.commit()
    print(f"✅ Created {len(applications_data)} applications")


def seed_database():
    print("🚀 Starting database seeding...")

    init_db()
    print("✅ Database tables created")

    db = SessionLocal()

    try:
        existing_applications = db.query(Application).count()

        if existing_applications > 0:
            print("⚠️ Database already contains data. Skipping seed.")
            return

        print("📁 Creating applications...")
        create_applications(db)

        print("🎉 Database seeding completed successfully!")

    except Exception as e:
        print(f"❌ Error during seeding: {e}")
        db.rollback()

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
