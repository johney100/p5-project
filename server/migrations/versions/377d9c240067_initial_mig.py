"""initial mig

Revision ID: 377d9c240067
Revises: 
Create Date: 2024-10-18 15:45:12.952153

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '377d9c240067'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('authors',
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('storyId', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('stories',
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('body', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('location', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('story_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], name=op.f('fk_comments_story_id_stories')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_comments_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('stories_authors',
    sa.Column('story_id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['authors.id'], name=op.f('fk_stories_authors_author_id_authors')),
    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], name=op.f('fk_stories_authors_story_id_stories')),
    sa.PrimaryKeyConstraint('story_id', 'author_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('stories_authors')
    op.drop_table('comments')
    op.drop_table('users')
    op.drop_table('stories')
    op.drop_table('authors')
    # ### end Alembic commands ###
