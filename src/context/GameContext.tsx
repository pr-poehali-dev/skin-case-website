import { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
  balance: number;
  setBalance: (balance: number) => void;
  addBalance: (amount: number) => void;
  subtractBalance: (amount: number) => void;
  canAfford: (amount: number) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [balance, setBalance] = useState(1500); // Начальный баланс

  const addBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const subtractBalance = (amount: number) => {
    setBalance(prev => Math.max(0, prev - amount));
  };

  const canAfford = (amount: number) => {
    return balance >= amount;
  };

  return (
    <GameContext.Provider value={{
      balance,
      setBalance,
      addBalance,
      subtractBalance,
      canAfford
    }}>
      {children}
    </GameContext.Provider>
  );
};