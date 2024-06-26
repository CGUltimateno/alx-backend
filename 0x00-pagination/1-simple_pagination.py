#!/usr/bin/env python3
"""
a function that implements pagination
"""
from typing import Tuple
import csv
import math
from typing import List


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
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """return the appropriate page of the dataset"""
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        start_index, end_index = index_range(page, page_size)
        rows: List[List] = []
        self.dataset()
        if start_index > len(self.__dataset) or \
                end_index > len(self.__dataset):
            return []

        return ([self.__dataset[index] for index
                in range(start_index, end_index)])
