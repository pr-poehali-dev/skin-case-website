import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useGame } from '@/context/GameContext';
import StarField from '@/components/ui/StarField';

const Index = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const navigate = useNavigate();
  const { balance } = useGame();

  const cases = [
    {
      id: 1,
      name: 'Cyber Case',
      price: 299,
      rarity: 'Epic',
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: ['AK-47 | Redline', 'M4A4 | Asiimov', 'Karambit | Fade'],
      rarityColor: 'bg-electric-orange'
    },
    {
      id: 2,
      name: 'Neon Case',
      price: 199,
      rarity: 'Rare',
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: ['AWP | Electric Storm', 'Knife | Neon Fade', 'AK-47 | Wasteland'],
      rarityColor: 'bg-neon-cyan'
    },
    {
      id: 3,
      name: 'Elite Case',
      price: 599,
      rarity: 'Legendary',
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: ['AWP | Dragon Lore', 'Karambit | Fade', 'AK-47 | Fire Serpent'],
      rarityColor: 'bg-rare-gold'
    },
    {
      id: 4,
      name: 'Premium Case',
      price: 999,
      rarity: 'Mythical',
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: ['M4A4 | Howl', 'Karambit | Crimson Web', 'Butterfly Knife | Fade'],
      rarityColor: 'bg-purple-600'
    },
    {
      id: 5,
      name: 'Lucky Case',
      price: 149,
      rarity: 'Common',
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: ['Desert Eagle | Blaze', 'M9 Bayonet | Damascus', 'Various Skins'],
      rarityColor: 'bg-gray-500'
    },
    {
      id: 6,
      name: 'Spectrum Case',
      price: 450,
      rarity: 'Epic',
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: ['M4A1-S | Bright Water', 'AK-47 | Phantom Disruptor', 'Butterfly Knife | Autotronic'],
      rarityColor: 'bg-electric-orange'
    },
    {
      id: 7,
      name: 'Operation Case',
      price: 750,
      rarity: 'Legendary',
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: ['AWP | Gungnir', 'AK-47 | Wild Lotus', 'Specialist Gloves | Crimson Kimono'],
      rarityColor: 'bg-rare-gold'
    },
    {
      id: 8,
      name: 'Revolution Case',
      price: 1200,
      rarity: 'Mythical',
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: ['AK-47 | Inheritance', 'M4A4 | Temukau', 'Karambit | Revolution'],
      rarityColor: 'bg-purple-600'
    }
  ];

  const leaderboard = [
    { name: 'CyberNinja', cases: 1247, level: 89 },
    { name: 'NeonHunter', cases: 1156, level: 82 },
    { name: 'EliteGamer', cases: 987, level: 76 },
    { name: 'CaseKing', cases: 834, level: 71 },
    { name: 'SkinLord', cases: 723, level: 65 }
  ];

  const recentDrops = [
    { player: 'CyberNinja', item: 'AK-47 | Redline', rarity: 'Epic', image: '/img/ab8e5668-dec9-4db9-bb06-7f0febeb0edf.jpg' },
    { player: 'NeonHunter', item: 'Karambit | Fade', rarity: 'Legendary', image: '/img/1717bfc8-5a44-48e6-8e4d-e4729d2ef2f2.jpg' },
    { player: 'EliteGamer', item: 'AWP | Dragon Lore', rarity: 'Mythical', image: '/img/3b96dcbb-d143-475f-bb6f-da4b0107aa18.jpg' },
    { player: 'SkinCollector', item: 'M4A4 | Asiimov', rarity: 'Rare', image: '/img/96c5788a-84b0-4c72-8c1d-3c32e2f64c20.jpg' },
    { player: 'CaseOpener', item: 'Glock-18 | Water Elemental', rarity: 'Common', image: '/img/2d01df01-bc3a-4f5a-b588-cad1c5a11a77.jpg' }
  ];

  return (
    <div className="min-h-screen relative">
      <StarField />
      <div className="cosmic-card min-h-screen text-foreground font-roboto">
        {/* Header */}
        <header className="border-b border-border cosmic-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-orbitron font-bold text-primary">CASE HUNTER</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Icon name="Trophy" size={18} className="mr-2" />
              Рейтинг
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Icon name="Wallet" size={18} className="mr-2" />
              {balance} ₽
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-orbitron font-black text-primary mb-6 animate-glow">
            ОТКРОЙ КЕЙС
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Испытай удачу и получи редкие скины в самых эпичных кейсах игровой вселенной
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3">
              <Icon name="Play" size={20} className="mr-2" />
              Открыть кейс
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-3">
              <Icon name="BarChart3" size={20} className="mr-2" />
              Статистика
            </Button>
          </div>
          
          {/* Floating Case Animation */}
          <div className="relative mx-auto w-48 h-48 mb-8">
            <img 
              src="/img/283d384c-7a66-4f73-8fa0-68b67fdf1c4a.jpg" 
              alt="Gaming Case" 
              className="w-full h-full object-cover rounded-xl animate-float shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl animate-glow"></div>
          </div>
        </div>
      </section>

      {/* Cases Catalog */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-orbitron font-bold text-center mb-12 text-primary">
          ДОСТУПНЫЕ КЕЙСЫ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem) => (
            <Card 
              key={caseItem.id} 
              className="cosmic-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer group case-glow"
              onClick={() => navigate(`/case/${caseItem.id}`)}
            >
              <CardHeader className="relative">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={`${caseItem.rarityColor} text-white font-semibold`}>
                      {caseItem.rarity}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-2xl font-orbitron text-primary">{caseItem.name}</CardTitle>
                <CardDescription className="text-lg text-secondary font-bold">
                  {caseItem.price} ₽
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground font-medium">Содержимое:</p>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.items.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/case/${caseItem.id}`);
                    }}
                  >
                    <Icon name="Package" size={18} className="mr-2" />
                    Открыть за {caseItem.price} ₽
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

        {/* Stats Section */}
        <section className="cosmic-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Leaderboard */}
            <div>
              <h3 className="text-3xl font-orbitron font-bold mb-8 text-primary flex items-center">
                <Icon name="Trophy" size={32} className="mr-3 text-accent" />
                ТОП ИГРОКОВ
              </h3>
              <Card className="cosmic-card border-border case-glow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {leaderboard.map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{player.name}</p>
                            <p className="text-sm text-muted-foreground">Уровень {player.level}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-secondary">{player.cases}</p>
                          <p className="text-xs text-muted-foreground">кейсов</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Drops */}
            <div>
              <h3 className="text-3xl font-orbitron font-bold mb-8 text-primary flex items-center">
                <Icon name="Star" size={32} className="mr-3 text-accent" />
                ПОСЛЕДНИЕ ДРОПЫ
              </h3>
              <Card className="cosmic-card border-border case-glow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentDrops.map((drop, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                        <img 
                          src={drop.image} 
                          alt={drop.item}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{drop.item}</p>
                          <p className="text-sm text-muted-foreground">выпал игроку {drop.player}</p>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">
                          {drop.rarity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

        {/* Footer */}
        <footer className="border-t border-border cosmic-card py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-6 mb-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Поддержка
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Icon name="FileText" size={16} className="mr-2" />
              Правила
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Icon name="Info" size={16} className="mr-2" />
              О проекте
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Case Hunter. Все права защищены.
          </p>
        </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;