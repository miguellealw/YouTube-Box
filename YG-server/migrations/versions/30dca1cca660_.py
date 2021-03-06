"""category_user_foreign_key_cascades_on_delete

Revision ID: 30dca1cca660
Revises: 2b6328e3f2c2
Create Date: 2021-06-11 19:50:04.743784

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '30dca1cca660'
down_revision = '2b6328e3f2c2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('category_user_id_fkey', 'category', type_='foreignkey')
    op.create_foreign_key(None, 'category', 'user', ['user_id'], ['id'], ondelete='cascade')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'category', type_='foreignkey')
    op.create_foreign_key('category_user_id_fkey', 'category', 'user', ['user_id'], ['id'])
    # ### end Alembic commands ###
