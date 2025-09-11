import type { Article } from '../../types/admin';
import { ArticleListItem } from './ArticleListItem';

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}

export function ArticleList({ articles, loading, onEdit, onDelete }: ArticleListProps) {
  if (loading) {
    return (
      <div className="admin-card">
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-admin-accent-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <div className="px-6 py-4 border-b border-admin-border">
        <h3 className="text-lg font-medium text-admin-text-primary">
          Esošās aktualitātes ({articles.length})
        </h3>
      </div>

      {articles.length === 0 ? (
        <div className="p-6 text-center text-admin-text-secondary">
          Nav pievienota neviena aktualitāte
        </div>
      ) : (
        <div className="divide-y divide-admin-border">
          {articles.map((article) => (
            <ArticleListItem
              key={article.id}
              article={article}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
