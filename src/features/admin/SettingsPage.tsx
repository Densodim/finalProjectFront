export default function SettingsPage() {
  return (
    <>
      <div className="container py-4">
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h2 className="card-title mb-3">Настройки</h2>
            <div className="mb-4">
              <h4 className="mb-2">
                <i className="bi bi-people me-2"></i>Управление пользователями
              </h4>
              {/* Здесь будет форма или таблица */}
            </div>
            <div>
              <h4 className="mb-2">
                <i className="bi bi-sliders me-2"></i>Системные настройки
              </h4>
              {/* Здесь будут элементы управления настройками */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
