import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Period {
  from: string | Date | undefined;
  to: string | Date | undefined;
}

export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd", { locale: ptBR })} - ${format(
      defaultTo,
      "LLL dd, y",
      { locale: ptBR }
    )}`;
  }

  if (period.to) {
    return `${format(period.from, "LLL dd", { locale: ptBR })} - ${format(
      period.to,
      "LLL dd, y",
      { locale: ptBR }
    )}`;
  }

  return format(period.from, "LLL dd, y", { locale: ptBR });
}

export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000;
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

export function formatCurrency(value: number, options: { addPrefix: boolean } = { addPrefix: false }) {
  const formattedValue = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);

  if(options.addPrefix) {
    return formattedValue;
  }

  const withoutCurrencySymbol = formattedValue.replace(/[^\d.,-]/g, '');

  return withoutCurrencySymbol;
}

export const generateRandomTones = () => {
  const hue = Math.floor(Math.random() * 60) + 100; // Random hue between 100 and 160 (green tones)
  const saturation = Math.floor(Math.random() * 30) + 70; // Random saturation between 70% and 100%
  const lightness = Math.floor(Math.random() * 20) + 40; // Random lightness between 40% and 60%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const days = [
    {
      "date": "2024-07-05T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-06T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-07T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-08T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-09T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-10T00:00:00.000Z",
      "income": 800000,
      "expenses": 0
    },
    {
      "date": "2024-07-11T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-12T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-13T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-14T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-15T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-16T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-17T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-18T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-19T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-20T00:00:00.000Z",
      "income": 2356700,
      "expenses": 0
    },
    {
      "date": "2024-07-21T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-22T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-23T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-24T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-25T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-26T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-27T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-28T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-29T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-30T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-07-31T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-08-01T00:00:00.000Z",
      "income": 0,
      "expenses": 400000
    },
    {
      "date": "2024-08-02T00:00:00.000Z",
      "income": 0,
      "expenses": 0
    },
    {
      "date": "2024-08-03T00:00:00.000Z",
      "income": 400000,
      "expenses": 0
    },
    {
      "date": "2024-08-04T00:00:00.000Z",
      "income": 0,
      "expenses": 650000
    }
];

export function getLastSevenDaysStats(data: typeof days = []) {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const lastSevenDays = data.filter(day => {
    const dayDate = new Date(day.date);
    return dayDate >= sevenDaysAgo && dayDate <= today;
  });

  const totalIncome = lastSevenDays.reduce((sum, day) => sum + day.income, 0);
  const totalExpenses = lastSevenDays.reduce((sum, day) => sum + day.expenses, 0);

  const averageIncome = totalIncome / 7;
  const averageExpenses = totalExpenses / 7;
  const totalAverage = (totalIncome - totalExpenses) / 7;

  return {
    days: lastSevenDays,
    averageIncome: convertAmountFromMiliunits(averageIncome),
    averageExpenses: convertAmountFromMiliunits(averageExpenses),
    totalAverage: convertAmountFromMiliunits(totalAverage)
  };
}
