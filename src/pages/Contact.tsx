import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { APP_CONFIG } from '@/config/constants';
import { SEOHead } from '@/components/SEOHead';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contactMethods = [
    {
      icon: Phone,
      title: 'Téléphone',
      value: APP_CONFIG.CONTACT.PHONE,
      description: 'Lun-Dim 8h-22h',
      color: 'primary'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: APP_CONFIG.CONTACT.WHATSAPP,
      description: 'Réponse immédiate',
      color: 'success'
    },
    {
      icon: Mail,
      title: 'Email',
      value: APP_CONFIG.CONTACT.EMAIL,
      description: 'Réponse sous 2h',
      color: 'accent'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate form submission
      console.log('Form submitted:', formData);

      toast({
        title: "Message envoyé !",
        description: "Votre message a été envoyé. Nous vous contacterons bientôt.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre message.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Nous contacter"
        description="Besoin d’aide ou d’informations ? L’équipe CWARETT.TN est toujours à votre écoute ! Contactez-nous facilement par téléphone, e-mail ou WhatsApp et profitez d’un support rapide et efficace."
        keywords="contact CWARETT, support client, aide, questions, WhatsApp, téléphone"
      />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <MessageCircle className="h-8 w-8 text-primary animate-glow" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Nous contacter
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Contactez 
              <span className="text-white ml-2">
                 notre équipe
              </span>
              <br />
              <span className="text-2xl lg:text-3xl text-muted-foreground">
               en quelques clics
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
             Toujours à vos côtés, à tout moment, pour répondre à vos besoins et concrétiser vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card 
                key={method.title} 
                className="gradient-card border-border hover-lift animate-slide-up text-center"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${method.color}/10 mb-4`}>
                    <method.icon className={`h-8 w-8 text-${method.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-lg font-medium text-primary mb-1">{method.value}</p>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <Card className="gradient-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Send className="h-6 w-6 text-primary" />
                    <span>Envoyez-nous un message</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Remplissez ce formulaire pour nous contacter rapidement.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input 
                          id="name"
                          placeholder="Votre nom complet"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input 
                          id="phone"
                          placeholder="+216 XX XXX XXX"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input 
                        id="subject"
                        placeholder="Objet de votre message"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message"
                        placeholder="Votre message..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                      />
                    </div>

                    <Button onClick={handleSubmit} variant="hero" size="lg" className="w-full">
                      <Send className="mr-2 h-5 w-5" />
                      Envoyer le message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info & Process */}
            <div className="space-y-8">
              {/* Process */}
              <Card className="gradient-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">Comment ça marche ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Contactez-nous</h3>
                      <p className="text-sm text-muted-foreground">
                        Remplissez le formulaire avec vos informations et votre demande.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Nous vous répondons</h3>
                      <p className="text-sm text-muted-foreground">
                        Notre équipe vous contacte rapidement pour discuter de votre projet.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-success rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Solution personnalisée</h3>
                      <p className="text-sm text-muted-foreground">
                        Nous vous proposons la meilleure solution adaptée à vos besoins.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guarantees */}
              <Card className="gradient-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">Pourquoi nous choisir ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-sm">Réponse rapide garantie</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-sm">Équipe professionnelle et expérimentée</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-sm">Support client 7j/7</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-sm">Solutions sur mesure</span>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="gradient-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span>Notre localisation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                     <strong>Nabeul,Tunisie</strong><br />
                     
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{APP_CONFIG.BUSINESS.HOURS}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Questions
              <span className="gradient-primary bg-clip-text text-transparent ml-2">
                fréquentes
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Quels sont vos délais de réponse ?</h3>
                <p className="text-sm text-muted-foreground">
                  Nous répondons généralement sous 2 heures, et sommes disponibles 24h/24.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Comment puis-je acheter vos services ?</h3>
                <p className="text-sm text-muted-foreground">
                  Il vous suffit de sélectionner votre offre, de valider la commande et vous recevrez vos accès rapidement et en toute sécurité par e-mail, WhatsApp ou tout autre moyen de communication convenu.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Comment puis-je vous joindre en urgence ?</h3>
                <p className="text-sm text-muted-foreground">
                  WhatsApp est le moyen le plus rapide pour une réponse immédiate.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Dans quels domaines intervenez-vous ?</h3>
                <p className="text-sm text-muted-foreground">
                  Nous couvrons un large éventail de services. Contactez-nous pour en savoir plus !
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Travaillez-vous avec les entreprises ?</h3>
                <p className="text-sm text-muted-foreground">
                  Oui, nous accompagnons aussi bien les particuliers que les professionnels.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Offrez-vous des devis personnalisés ?</h3>
                <p className="text-sm text-muted-foreground">
                  Absolument ! Chaque projet est unique et mérite une approche sur mesure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
