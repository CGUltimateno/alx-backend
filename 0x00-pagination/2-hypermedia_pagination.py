#!/usr/bin/env python3
"""
Implement a get_hyper method that takes the
same arguments (and defaults) as get_page
and returns a dictionary containing the
 following key-value pairs
"""
from typing import List, Tuple, Dict
import csv
import math


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """return a tuple of size two containing a start index and an end index"""
    return (page - 1) * page_size, page * page_size


class Server:
    """Server class to paginate"""
    DATA_FILE = "0x00-pagination.csv"

    def __init__(self):
        """initialize the server"""
        self.__dataset = None

    def dataset(self) -> List[List[str]]:
        """load the data from the csv file"""
        if self.__dataset is None:
            with open(self.DATA_FILE, 'r', encoding='utf-8') as f:
                reader = csv.reader(f)
                self.__dataset = [row for row in reader]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List[str]]:
        """return the appropriate page of the dataset"""
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        self.dataset()
        start, end = index_range(page, page_size)
        return self.__dataset[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, int]:
        """return a dictionary containing the following key-value pairs"""
        self.dataset()
        total_pages = math.ceil(len(self.__dataset) / page_size)
        return {
            "page_size": page_size if page < total_pages else 0,
            "page": page,
            "data": self.get_page(page, page_size),
            "next_page": page + 1 if page < total_pages else None,
            "prev_page": page - 1 if page > 1 else None,
            "total_pages": total_pages
        }
