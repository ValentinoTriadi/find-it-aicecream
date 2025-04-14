export const objectivesMap: Record<string, string[]> = {
  '1': ['Greet customer', 'Offer menu', 'Confirm order'],
  '2': ['Greet guest', 'Ask for duration', 'Confirm reservation'],
  '3': ['Ask qualifications', 'Check motivation', 'Make offer'],
  '4': ['Understand destination', 'Give direction', 'Confirm understanding'],
};

export const rolesMap: Record<string, Record<'user1' | 'user2', string>> = {
  '1': { user1: 'waiter', user2: 'customer' },
  '2': { user1: 'receptionist', user2: 'guest' },
  '3': { user1: 'interviewer', user2: 'candidate' },
  '4': { user1: 'local', user2: 'traveler' },
};
