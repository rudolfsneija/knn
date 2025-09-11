import type { Article } from '../../types/admin';

interface ArticleListItemProps {
  article: Article;
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}

export function ArticleListItem({ article, onEdit, onDelete }: ArticleListItemProps) {
  const handleDelete = () => {
    if (window.confirm('Vai tiešām vēlaties dzēst šo aktualitāti?')) {
      onDelete(article.id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Article Image */}
        {(article.main_image || article.image_url) && (
          <div className="w-full lg:w-36 h-36 flex-shrink-0">
            <img
              src={article.main_image?.url || article.image_url}
              alt={article.title}
              className="w-full h-full object-cover rounded-lg border-2 border-admin-border"
            />
          </div>
        )}
        
        {/* Article Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-xl font-semibold text-admin-text-primary truncate">
                  {article.title}
                </h4>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {article.published ? (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                    Publicēts
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full font-medium">
                    Melnraksts
                  </span>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3 flex-shrink-0">
              <button
                onClick={() => onEdit(article)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Rediģēt
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Dzēst
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-admin-text-secondary leading-relaxed">
              {article.excerpt || (article.content.length > 300
                ? `${article.content.substring(0, 200)}...`
                : article.content)}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-admin-text-secondary">
              <span>
                {new Date(article.created_at).toLocaleDateString('lv-LV')}
              </span>
              {article.images && article.images.length > 0 && (
                <span>
                  {article.images.length} attēl{article.images.length === 1 ? 's' : 'i'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
