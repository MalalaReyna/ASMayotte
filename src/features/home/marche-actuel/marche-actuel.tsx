import PublicTenderSection from "@/features/services/public-market/PublicTenderSection";

export default function MarcheActuel() {
    return (
        <div className="bg-white py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="sm:text-center">
                    <h2 className="text-lg font-semibold leading-8 text-indigo-600">Marché actuel</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Découvrez les marchés publics en cours</p>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">Restez informé des opportunités de marché public en cours et ne manquez pas les appels d'offres pertinents pour votre entreprise.</p>
                </div>
                <div className="mt-16 flow-root sm:mt-20">
                    <div className="-my-8 divide-y divide-gray-100">
                        <h1>Marchés publics en cours</h1>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}