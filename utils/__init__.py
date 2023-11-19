import datetime

from .logger import create_logger


def get_current_time() -> datetime.datetime:
    return datetime.datetime.now(tz=datetime.timezone.utc)


if __name__ == '__main__':
    assert get_current_time() is not None
    assert isinstance(get_current_time(), datetime.datetime)
