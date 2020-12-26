from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os
from django.core.files import File

class DontCreateIfExistStorage(FileSystemStorage):

    def save(self, name, content, max_length=None):
        """
        Save new content to the file specified by name. The content should be
        a proper File object or any Python file-like object, ready to be read
        from the beginning.
        """
        # Get the proper name for the file, as it will actually be saved.
        if name is None:
            name = content.name
        if self.exists(name):
            return str(name).replace('\\', '/')
        if not hasattr(content, 'chunks'):
            content = File(content, name)
        name = self.get_available_name(name, max_length=max_length)
        return self._save(name, content)