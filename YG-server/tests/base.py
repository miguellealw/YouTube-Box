import unittest
from YG_server import create_app, database


def clean_db(db):
	for table in reversed(db.metadata.sorted_tables):
		db.session.execute(table.delete())


class BaseTestCase(unittest.TestCase):
	db = None

	@classmethod
	def setUpClass(cls):
		super(BaseTestCase, cls).setUpClass()

		# Pass true to use testing config
		cls.app = create_app(True)
		cls.db = database.db
		cls.db.app = cls.app
		cls.db.create_all()

	@classmethod
	def tearDownClass(cls):
		cls.db.drop_all()
		super(BaseTestCase, cls).tearDownClass()

	def setUp(self):
		super(BaseTestCase, self).setUp()

		self.client = self.app.test_client()
		self.app_context = self.app.app_context()
		self.app_context.push()
		clean_db(self.db)

	def tearDown(self):
		self.db.session.rollback()
		self.app_context.pop()

		super(BaseTestCase, self).tearDown()