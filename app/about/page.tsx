import { getUIElements } from '@/app/lib/api';

/**
 * About page component
 * Displays information about the gallery, its history, and mission
 */
export default async function AboutPage() {
  // Fetch UI elements at build time (could be expanded to include about page content)
  const uiElements = await getUIElements('fr');
  
  // Use the fetched value or fallback to a default
  const aboutTitle = uiElements['about.title'] || 'À propos de la Galerie';
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{aboutTitle}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left column: Text content */}
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Notre Histoire</h2>
            <p className="mb-4">
              Fondée en 1985 par Jean-Claude Papazian, notre galerie s&apos;est établie comme une référence 
              dans le domaine des tapis et textiles d&apos;art ancien. Avec plus de 35 ans d&apos;expérience, 
              nous avons développé une expertise unique dans la sélection et la présentation de pièces 
              exceptionnelles provenant du monde entier.
            </p>
            <p>
              Notre passion pour l&apos;artisanat traditionnel et l&apos;histoire des textiles nous a amenés 
              à constituer une collection remarquable, témoignant de la richesse culturelle et artistique 
              de différentes régions du monde.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
            <p className="mb-4">
              Notre mission est de préserver et de partager le patrimoine textile mondial en proposant 
              des pièces authentiques et de grande qualité. Nous nous efforçons de sensibiliser le public 
              à la valeur culturelle et artistique des tapis et textiles anciens.
            </p>
            <p>
              Chaque pièce de notre collection est soigneusement sélectionnée pour son intérêt historique, 
              sa qualité technique et sa beauté esthétique. Nous accordons une attention particulière à 
              l&apos;authenticité et à la provenance de nos œuvres.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Notre Expertise</h2>
            <p>
              Notre équipe de spécialistes possède une connaissance approfondie des techniques de tissage, 
              des motifs traditionnels et de l&apos;histoire des textiles. Nous offrons des conseils personnalisés 
              aux collectionneurs, aux institutions et aux amateurs d&apos;art, et nous partageons volontiers 
              notre savoir avec tous ceux qui s&apos;intéressent à ce domaine fascinant.
            </p>
          </section>
        </div>
        
        {/* Right column: Images */}
        <div className="space-y-8">
          {/* Image placeholders - replace with actual images when available */}
          <div className="relative h-80 w-full bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-center p-4">
              Image de la galerie<br />
              <span className="text-sm">(Remplacez par une image réelle à /public/images/gallery-interior.jpg)</span>
            </p>
          </div>
          
          <div className="relative h-80 w-full bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-center p-4">
              Image du fondateur<br />
              <span className="text-sm">(Remplacez par une image réelle à /public/images/founder.jpg)</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Full width section */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Visitez Notre Galerie</h2>
        <p className="text-center max-w-3xl mx-auto mb-8">
          Nous vous invitons à découvrir notre collection en personne. Notre espace d&apos;exposition 
          vous permet d&apos;apprécier pleinement la beauté et les détails de nos pièces dans un 
          cadre élégant et accueillant.
        </p>
        
        <div className="bg-gray-100 p-8 rounded-lg">
          <h3 className="text-xl font-medium mb-4 text-center">Horaires d&apos;ouverture</h3>
          <div className="flex justify-center">
            <ul className="space-y-2">
              <li><span className="font-medium">Mardi - Vendredi:</span> 10h - 18h</li>
              <li><span className="font-medium">Samedi:</span> 11h - 17h</li>
              <li><span className="font-medium">Dimanche - Lundi:</span> Fermé</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 