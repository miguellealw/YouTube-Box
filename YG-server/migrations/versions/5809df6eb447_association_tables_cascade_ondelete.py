"""association tables cascade ondelete

Revision ID: 5809df6eb447
Revises: 30dca1cca660
Create Date: 2021-06-11 20:14:17.984186

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5809df6eb447'
down_revision = '30dca1cca660'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('channel_category_channel_id_fkey', 'channel_category', type_='foreignkey')
    op.drop_constraint('channel_category_category_id_fkey', 'channel_category', type_='foreignkey')
    op.create_foreign_key(None, 'channel_category', 'channel', ['channel_id'], ['id'], ondelete='cascade')
    op.create_foreign_key(None, 'channel_category', 'category', ['category_id'], ['id'], ondelete='cascade')
    op.drop_constraint('user_channel_user_id_fkey', 'user_channel', type_='foreignkey')
    op.drop_constraint('user_channel_channel_id_fkey', 'user_channel', type_='foreignkey')
    op.create_foreign_key(None, 'user_channel', 'channel', ['channel_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'user_channel', 'user', ['user_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user_channel', type_='foreignkey')
    op.drop_constraint(None, 'user_channel', type_='foreignkey')
    op.create_foreign_key('user_channel_channel_id_fkey', 'user_channel', 'channel', ['channel_id'], ['id'])
    op.create_foreign_key('user_channel_user_id_fkey', 'user_channel', 'user', ['user_id'], ['id'])
    op.drop_constraint(None, 'channel_category', type_='foreignkey')
    op.drop_constraint(None, 'channel_category', type_='foreignkey')
    op.create_foreign_key('channel_category_category_id_fkey', 'channel_category', 'category', ['category_id'], ['id'])
    op.create_foreign_key('channel_category_channel_id_fkey', 'channel_category', 'channel', ['channel_id'], ['id'])
    # ### end Alembic commands ###
