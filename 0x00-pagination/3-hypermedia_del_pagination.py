#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination.
"""
from typing import List, Dict, Any, Tuple
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
        self.__indexed_dataset = None

    def dataset(self) -> List[List[str]]:
        """load the data from the csv file"""
        if self.__dataset is None:
            with open(self.DATA_FILE, 'r', encoding='utf-8') as f:
                reader = csv.reader(f)
                self.__dataset = [row for row in reader]
        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List[str]]:
        """return the dataset indexed"""
        if self.__dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(self.__dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """ Fetch a number of `page_size` pages
        starting from the given `index`."""
        dataset = self.indexed_dataset()

        assert isinstance(index, int) and 0 <= index <= len(dataset) - page_size
        end_index = index + page_size
        data = []
        i = index
        while i < end_index:
            if not dataset.get(i):
                end_index += 1
            else:
                data.append(dataset.get(i))
            i += 1
        return ({
            "index": index,
            "next_index": end_index,
            "page_size": page_size,
            "data": data
        })
