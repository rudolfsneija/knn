export function Footer() {
  return (
    <footer className="bg-secondary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <img 
                src="/logo/knn-small-logo.svg" 
                alt="KNN Logo" 
                className="h-24"
              />
            </div>
            <p className="text-secondary-100">
              Mūsu darbs - Jūsu drošība
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Saites</h3>
            <ul className="space-y-2">
              <li><a href="/aktualitates" className="text-secondary-100 hover:text-white transition-colors">Aktualitātes</a></li>
              <li><a href="/pakalpojumi" className="text-secondary-100 hover:text-white transition-colors">Pakalpojumi</a></li>
              <li><a href="/preces" className="text-secondary-100 hover:text-white transition-colors">Preces</a></li>
              <li><a href="/par-uznemumu" className="text-secondary-100 hover:text-white transition-colors">Par uzņēmumu</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakti</h3>
            <p className="text-secondary-100">
              E-pasts: info@knn.lv<br />
            </p>
          </div>
        </div>
        
        <div className="border-t border-secondary-500 mt-8 pt-8 text-center">
          <p className="text-secondary-100">
            © {new Date().getFullYear()} KNN Serviss. Visas tiesības aizsargātas.
          </p>
        </div>
      </div>
    </footer>
  );
}
