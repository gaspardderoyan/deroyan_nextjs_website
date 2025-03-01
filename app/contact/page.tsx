/**
 * Contact page component
 * Displays contact information for the gallery
 */
export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contact</h1>
      <div className="max-w-2xl">
        <p className="mb-6">
          Pour toute question concernant notre galerie ou nos œuvres, n&apos;hésitez pas à nous contacter.
        </p>
        
        <div className="space-y-4 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Adresse</h2>
            <p>123 Rue de l&apos;Art</p>
            <p>75001 Paris, France</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Téléphone</h2>
            <p>+33 1 23 45 67 89</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p>contact@galerie-example.com</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Horaires d&apos;ouverture</h2>
            <p>Du mardi au samedi: 10h - 18h</p>
            <p>Dimanche et lundi: Fermé</p>
          </div>
        </div>
        
        {/* This would be a good place to add a contact form in the future */}
      </div>
    </div>
  );
} 