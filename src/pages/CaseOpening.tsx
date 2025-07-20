import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useGame } from '@/context/GameContext';
import { useSound } from '@/hooks/useSound';
import { toast } from '@/hooks/use-toast';

interface CaseItem {
  id: number;
  name: string;
  rarity: string;
  image: string;
  price: number;
  rarityColor: string;
}

const CaseOpening = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { balance, subtractBalance, addBalance, canAfford } = useGame();
  const { playCaseOpenSound } = useSound();
  const [isOpening, setIsOpening] = useState(false);
  const [openedItem, setOpenedItem] = useState<CaseItem | null>(null);
  const [animationStage, setAnimationStage] = useState<'closed' | 'opening' | 'opened'>('closed');

  const cases = {
    '1': {
      name: 'Cyber Case',
      price: 299,
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: [
        { id: 1, name: 'AK-47 | Neon Strike', rarity: 'Epic', image: '/img/63ac6fd9-a139-4f22-a7fa-f638aeebf8ec.jpg', price: 1200, rarityColor: 'bg-electric-orange' },
        { id: 2, name: 'M4A4 | Cyber Storm', rarity: 'Rare', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 800, rarityColor: 'bg-neon-cyan' },
        { id: 3, name: 'Glock-18 | Electric', rarity: 'Common', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 200, rarityColor: 'bg-gray-500' },
        { id: 4, name: 'USP-S | Neon', rarity: 'Uncommon', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 400, rarityColor: 'bg-green-500' }
      ]
    },
    '2': {
      name: 'Neon Case',
      price: 199,
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: [
        { id: 5, name: 'AWP | Electric Storm', rarity: 'Legendary', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 2500, rarityColor: 'bg-rare-gold' },
        { id: 6, name: 'Knife | Neon Fade', rarity: 'Epic', image: '/img/6ecc0f54-ca53-4979-b946-6f65400ffd52.jpg', price: 1800, rarityColor: 'bg-electric-orange' },
        { id: 7, name: 'P90 | Cyber', rarity: 'Rare', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 600, rarityColor: 'bg-neon-cyan' }
      ]
    },
    '3': {
      name: 'Elite Case',
      price: 599,
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: [
        { id: 8, name: 'Dragon Lore', rarity: 'Mythical', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 5000, rarityColor: 'bg-purple-600' },
        { id: 9, name: 'Karambit | Fade', rarity: 'Legendary', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 3500, rarityColor: 'bg-rare-gold' },
        { id: 10, name: 'AK-47 | Gold Edition', rarity: 'Epic', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 2200, rarityColor: 'bg-electric-orange' }
      ]
    }
  };

  const selectedCase = cases[caseId as keyof typeof cases];

  const openCase = async () => {
    if (!selectedCase || isOpening) return;
    
    // Проверяем достаточность средств
    if (!canAfford(selectedCase.price)) {
      toast({
        title: "Недостаточно средств",
        description: `Нужно ${selectedCase.price} ₽, а у вас ${balance} ₽`,
        variant: "destructive"
      });
      return;
    }
    
    // Списываем деньги
    subtractBalance(selectedCase.price);
    
    setIsOpening(true);
    setAnimationStage('opening');
    
    // Воспроизводим звук
    playCaseOpenSound();
    
    // Симуляция анимации открытия
    setTimeout(() => {
      const randomItem = selectedCase.items[Math.floor(Math.random() * selectedCase.items.length)];
      setOpenedItem(randomItem);
      setAnimationStage('opened');
      setIsOpening(false);
      
      toast({
        title: "Кейс открыт!",
        description: `Вы получили: ${randomItem.name}`,
      });
    }, 3000);
  };

  const resetCase = () => {
    setAnimationStage('closed');
    setOpenedItem(null);
    setIsOpening(false);
  };

  const sellItem = () => {
    if (!openedItem) return;
    
    addBalance(openedItem.price);
    
    toast({
      title: "Предмет продан!",
      description: `Вы получили ${openedItem.price} ₽ за ${openedItem.name}`,
    });
    
    resetCase();
  };

  if (!selectedCase) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-orbitron font-bold text-primary mb-4">Кейс не найден</h1>
          <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90">
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-roboto">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-foreground hover:text-primary"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          
          <h1 className="text-2xl font-orbitron font-bold text-primary">
            {selectedCase.name}
          </h1>
          
          <div className="flex items-center space-x-4">
            <Badge className="bg-secondary text-secondary-foreground font-semibold">
              {selectedCase.price} ₽
            </Badge>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Icon name="Wallet" size={18} className="mr-2" />
              {balance} ₽
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Case Opening Area */}
          <div className="relative mb-12">
            {animationStage === 'closed' && (
              <div className="animate-float">
                <img 
                  src={selectedCase.image} 
                  alt={selectedCase.name}
                  className="w-64 h-64 mx-auto object-cover rounded-xl shadow-2xl neon-glow"
                />
              </div>
            )}
            
            {animationStage === 'opening' && (
              <div className="relative">
                <div className="w-64 h-64 mx-auto bg-gradient-to-r from-primary to-secondary rounded-xl animate-spin">
                  <div className="absolute inset-4 bg-background rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Package" size={48} className="text-primary animate-bounce mx-auto mb-2" />
                      <p className="text-primary font-orbitron font-bold">ОТКРЫВАЕМ...</p>
                    </div>
                  </div>
                </div>
                
                {/* Rotating items preview */}
                <div className="absolute top-80 left-1/2 transform -translate-x-1/2 flex space-x-4 animate-pulse">
                  {selectedCase.items.map((item, index) => (
                    <div key={index} className="w-16 h-16 bg-card rounded-lg flex items-center justify-center opacity-50">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {animationStage === 'opened' && openedItem && (
              <div className="animate-glow">
                <Card className={`w-80 mx-auto ${openedItem.rarityColor} border-4 shadow-2xl`}>
                  <CardContent className="p-8 text-center">
                    <img 
                      src={openedItem.image} 
                      alt={openedItem.name}
                      className="w-48 h-48 mx-auto object-cover rounded-xl mb-6 animate-float"
                    />
                    <Badge className="mb-4 text-lg px-4 py-2 bg-white text-black font-bold">
                      {openedItem.rarity}
                    </Badge>
                    <h3 className="text-2xl font-orbitron font-bold text-white mb-2">
                      {openedItem.name}
                    </h3>
                    <p className="text-3xl font-bold text-white">
                      {openedItem.price} ₽
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-12">
            {animationStage === 'closed' && (
              <Button 
                size="lg" 
                onClick={openCase}
                disabled={isOpening || !canAfford(selectedCase.price)}
                className={`font-semibold px-12 py-4 text-xl ${
                  canAfford(selectedCase.price) 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                <Icon name="Package" size={24} className="mr-3" />
                {canAfford(selectedCase.price) 
                  ? `Открыть кейс за ${selectedCase.price} ₽` 
                  : `Нужно ${selectedCase.price} ₽ (у вас ${balance} ₽)`
                }
              </Button>
            )}
            
            {animationStage === 'opened' && (
              <>
                <Button 
                  size="lg" 
                  onClick={resetCase}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-3"
                >
                  <Icon name="RotateCcw" size={20} className="mr-2" />
                  Открыть еще
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={sellItem}
                  className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-3"
                >
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Продать за {openedItem.price} ₽
                </Button>
              </>
            )}
          </div>

          {/* Case Contents */}
          {animationStage === 'closed' && (
            <div>
              <h3 className="text-3xl font-orbitron font-bold mb-8 text-primary">
                СОДЕРЖИМОЕ КЕЙСА
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {selectedCase.items.map((item) => (
                  <Card key={item.id} className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105">
                    <CardContent className="p-4 text-center">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-24 object-cover rounded-lg mb-3"
                      />
                      <Badge className={`${item.rarityColor} text-white text-xs mb-2`}>
                        {item.rarity}
                      </Badge>
                      <p className="text-sm font-semibold text-foreground mb-1">{item.name}</p>
                      <p className="text-secondary font-bold">{item.price} ₽</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseOpening;