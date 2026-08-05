import sys
from loguru import logger

def setup_logging():
    logger.remove()
    if sys.stdout:
        logger.add(
            sys.stdout,
            format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>"
        )
    logger.add(
        "logs/vcs.log",
        rotation="10 MB",
        retention="7 days",
        level="DEBUG"
    )
