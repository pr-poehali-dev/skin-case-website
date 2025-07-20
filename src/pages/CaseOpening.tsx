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
  const [scrollItems, setScrollItems] = useState<CaseItem[]>([]);
  const [finalItemIndex, setFinalItemIndex] = useState(0);

  const cases = {
    '1': {
      name: 'Cyber Case',
      price: 299,
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: [
        { id: 1, name: 'P2000 | Digital', rarity: 'Common', image: '/img/63ac6fd9-a139-4f22-a7fa-f638aeebf8ec.jpg', price: 5, rarityColor: 'bg-gray-500' },
        { id: 2, name: 'Glock-18 | Blue', rarity: 'Common', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 12, rarityColor: 'bg-gray-500' },
        { id: 3, name: 'USP-S | Circuit', rarity: 'Uncommon', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 85, rarityColor: 'bg-green-500' },
        { id: 4, name: 'AK-47 | Blue Steel', rarity: 'Uncommon', image: '/img/6ecc0f54-ca53-4979-b946-6f65400ffd52.jpg', price: 145, rarityColor: 'bg-green-500' },
        { id: 5, name: 'M4A4 | Cyber Storm', rarity: 'Rare', image: '/img/63ac6fd9-a139-4f22-a7fa-f638aeebf8ec.jpg', price: 380, rarityColor: 'bg-blue-500' },
        { id: 6, name: 'AWP | Electric', rarity: 'Rare', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 520, rarityColor: 'bg-blue-500' },
        { id: 7, name: 'AK-47 | Neon Strike', rarity: 'Epic', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 1240, rarityColor: 'bg-electric-orange' },
        { id: 8, name: 'Karambit | Blue Steel', rarity: 'Legendary', image: '/img/6ecc0f54-ca53-4979-b946-6f65400ffd52.jpg', price: 2850, rarityColor: 'bg-rare-gold' }
      ]
    },
    '2': {
      name: 'Neon Case',
      price: 199,
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: [
        { id: 9, name: 'Five-Seven | Forest', rarity: 'Common', image: '/img/63ac6fd9-a139-4f22-a7fa-f638aeebf8ec.jpg', price: 8, rarityColor: 'bg-gray-500' },
        { id: 10, name: 'P90 | Storm', rarity: 'Common', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 18, rarityColor: 'bg-gray-500' },
        { id: 11, name: 'MAC-10 | Neon Rider', rarity: 'Uncommon', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 95, rarityColor: 'bg-green-500' },
        { id: 12, name: 'M4A1-S | Bright Water', rarity: 'Rare', image: '/img/6ecc0f54-ca53-4979-b946-6f65400ffd52.jpg', price: 285, rarityColor: 'bg-blue-500' },
        { id: 13, name: 'AK-47 | Wasteland Rebel', rarity: 'Epic', image: '/img/63ac6fd9-a139-4f22-a7fa-f638aeebf8ec.jpg', price: 890, rarityColor: 'bg-electric-orange' },
        { id: 14, name: 'AWP | Electric Storm', rarity: 'Legendary', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 2450, rarityColor: 'bg-rare-gold' },
        { id: 15, name: 'Knife | Neon Fade', rarity: 'Legendary', image: '/img/6ecc0f54-ca53-4979-b946-6f65400ffd52.jpg', price: 4200, rarityColor: 'bg-rare-gold' }
      ]
    },
    '3': {
      name: 'Elite Case',
      price: 599,
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: [
        { id: 16, name: 'FAMAS | Colony', rarity: 'Common', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 15, rarityColor: 'bg-gray-500' },
        { id: 17, name: 'Galil AR | Sandstorm', rarity: 'Uncommon', image: '/img/6ecc0f54-ca53-4979-b946-6f65400ffd52.jpg', price: 125, rarityColor: 'bg-green-500' },
        { id: 18, name: 'SSG 08 | Blood in Water', rarity: 'Rare', image: '/img/63ac6fd9-a139-4f22-a7fa-f638aeebf8ec.jpg', price: 445, rarityColor: 'bg-blue-500' },
        { id: 19, name: 'AWP | Asiimov', rarity: 'Epic', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 1850, rarityColor: 'bg-electric-orange' },
        { id: 20, name: 'AK-47 | Fire Serpent', rarity: 'Legendary', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 3200, rarityColor: 'bg-rare-gold' },
        { id: 21, name: 'Dragon Lore AWP', rarity: 'Mythical', image: '/img/6ecc0f54-ca53-4979-b946-6f65400ffd52.jpg', price: 8500, rarityColor: 'bg-purple-600' },
        { id: 22, name: 'Karambit | Fade', rarity: 'Mythical', image: '/img/63ac6fd9-a139-4f22-a7fa-f638aeebf8ec.jpg', price: 12500, rarityColor: 'bg-purple-600' }
      ]
    },
    '4': {
      name: 'Premium Case',
      price: 999,
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: [
        { id: 23, name: 'Tec-9 | Sandstorm', rarity: 'Common', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 25, rarityColor: 'bg-gray-500' },
        { id: 24, name: 'Nova | Antique', rarity: 'Uncommon', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 180, rarityColor: 'bg-green-500' },
        { id: 25, name: 'XM1014 | Seasons', rarity: 'Rare', image: '/img/6ecc0f54-ca53-4979-b946-6f65400ffd52.jpg', price: 680, rarityColor: 'bg-blue-500' },
        { id: 26, name: 'M4A4 | Howl', rarity: 'Epic', image: '/img/63ac6fd9-a139-4f22-a7fa-f638aeebf8ec.jpg', price: 2800, rarityColor: 'bg-electric-orange' },
        { id: 27, name: 'AWP | Dragon Lore', rarity: 'Legendary', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 6200, rarityColor: 'bg-rare-gold' },
        { id: 28, name: 'Karambit | Crimson Web', rarity: 'Mythical', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 15800, rarityColor: 'bg-purple-600' },
        { id: 29, name: 'Butterfly Knife | Fade', rarity: 'Ultra Rare', image: '/img/6ecc0f54-ca53-4979-b946-6f65400ffd52.jpg', price: 19000, rarityColor: 'bg-red-600' }
      ]
    },
    '5': {
      name: 'Lucky Case',
      price: 149,
      image: '/img/ef092dcf-a393-4def-92b8-b22975cbd7c7.jpg',
      items: [
        { id: 30, name: 'MP9 | Storm', rarity: 'Common', image: '/img/63ac6fd9-a139-4f22-a7fa-f638aeebf8ec.jpg', price: 3, rarityColor: 'bg-gray-500' },
        { id: 31, name: 'PP-Bizon | Brass', rarity: 'Common', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 7, rarityColor: 'bg-gray-500' },
        { id: 32, name: 'UMP-45 | Labyrinth', rarity: 'Uncommon', image: '/img/94c07533-37e7-4555-9ce0-a1a72dd2b59d.jpg', price: 45, rarityColor: 'bg-green-500' },
        { id: 33, name: 'SG 553 | Pulse', rarity: 'Rare', image: '/img/6ecc0f54-ca53-4979-b946-6f65400ffd52.jpg', price: 165, rarityColor: 'bg-blue-500' },
        { id: 34, name: 'Desert Eagle | Blaze', rarity: 'Epic', image: '/img/63ac6fd9-a139-4f22-a7fa-f638aeebf8ec.jpg', price: 650, rarityColor: 'bg-electric-orange' },
        { id: 35, name: 'M9 Bayonet | Damascus Steel', rarity: 'Legendary', image: '/img/250e76c1-c797-4dd5-a515-f01e31fa1937.jpg', price: 1950, rarityColor: 'bg-rare-gold' }
      ]
    }
  };

  const selectedCase = cases[caseId as keyof typeof cases];

  const generateScrollItems = (finalItem: CaseItem) => {
    const allItems = selectedCase!.items;
    const scrollLength = 50; // Количество элементов в прокрутке
    const items: CaseItem[] = [];
    
    // Добавляем случайные элементы
    for (let i = 0; i < scrollLength - 1; i++) {
      const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
      items.push(randomItem);
    }
    
    // Добавляем финальный элемент в конец
    items.push(finalItem);
    
    return items;
  };

  const selectRandomItem = () => {
    const items = selectedCase!.items;
    const rarityWeights = {
      'Common': 45,
      'Uncommon': 25, 
      'Rare': 15,
      'Epic': 8,
      'Legendary': 4,
      'Mythical': 2,
      'Ultra Rare': 1
    };
    
    const weightedItems: CaseItem[] = [];
    items.forEach(item => {
      const weight = rarityWeights[item.rarity as keyof typeof rarityWeights] || 1;
      for (let i = 0; i < weight; i++) {
        weightedItems.push(item);
      }
    });
    
    return weightedItems[Math.floor(Math.random() * weightedItems.length)];
  };

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
    
    // Выбираем финальный предмет с учетом редкости
    const finalItem = selectRandomItem();
    const scrollItemsList = generateScrollItems(finalItem);
    setScrollItems(scrollItemsList);
    setFinalItemIndex(scrollItemsList.length - 1);
    
    // Воспроизводим звук
    playCaseOpenSound();
    
    // Анимация прокрутки 4 секунды
    setTimeout(() => {
      setOpenedItem(finalItem);
      setAnimationStage('opened');
      setIsOpening(false);
      
      toast({
        title: "Кейс открыт!",
        description: `Вы получили: ${finalItem.name} за ${finalItem.price}₽`,
      });
    }, 4000);
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
                {/* Scroll Container */}
                <div className="w-full max-w-4xl mx-auto bg-card/20 rounded-xl p-4 border-2 border-primary/30">
                  <div className="relative h-32 overflow-hidden">
                    {/* Center Line Indicator */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-primary z-20 transform -translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 border-4 border-primary bg-background rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"></div>
                    
                    {/* Scrolling Items */}
                    <div 
                      className="flex absolute top-1/2 transform -translate-y-1/2 transition-all duration-4000 ease-out"
                      style={{
                        transform: `translateY(-50%) translateX(-${finalItemIndex * 120 + 120}px)`,
                        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      }}
                    >
                      {scrollItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex-shrink-0 w-28 h-28 mx-1">
                          <div className={`w-full h-full rounded-lg border-2 ${item.rarityColor} border-opacity-50 bg-card p-2 flex flex-col items-center justify-center`}>
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded mb-1"
                            />
                            <p className="text-xs text-center font-semibold text-foreground truncate w-full">
                              {item.price}₽
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Status */}
                <div className="text-center mt-6">
                  <Icon name="Package" size={48} className="text-primary animate-bounce mx-auto mb-2" />
                  <p className="text-primary font-orbitron font-bold text-xl">ОТКРЫВАЕМ КЕЙС...</p>
                  <div className="w-64 h-2 bg-background/50 rounded-full mx-auto mt-4 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse rounded-full"></div>
                  </div>
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
                  Продать за {openedItem?.price} ₽
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