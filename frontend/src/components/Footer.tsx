export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">KNN</h3>
            <p className="text-gray-300">
              Uzticams partneris jūsu biznesa attīstībai
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Saites</h3>
            <ul className="space-y-2">
              <li><a href="/aktualitates" className="text-gray-300 hover:text-white">Aktualitātes</a></li>
              <li><a href="/pakalpojumi" className="text-gray-300 hover:text-white">Pakalpojumi</a></li>
              <li><a href="/preces" className="text-gray-300 hover:text-white">Preces</a></li>
              <li><a href="/par-uznemumu" className="text-gray-300 hover:text-white">Par uzņēmumu</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakti</h3>
            <p className="text-gray-300">
              E-pasts: info@knn.lv<br />
              Tālrunis: +371 20000000
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} KNN. Visas tiesības aizsargātas.
          </p>
        </div>
      </div>
    </footer>
  );
}
