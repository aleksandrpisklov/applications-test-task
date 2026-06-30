from enum import Enum


class ApplicationStatus(str, Enum):
    new = "new"
    in_progress = "in_progress"
    done = "done"


class ApplicationPriority(str, Enum):
    low = "low"
    normal = "normal"
    high = "high"


class ApplicationSortBy(str, Enum):
    CREATED_AT = "created_at"
    PRIORITY = "priority"


class SortOrder(str, Enum):
    ASC = "asc"
    DESC = "desc"
