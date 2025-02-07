export type UserBadge = {
  name: string;
  badgeClass: string;
  description: string;
};

export const getUserBadge = (createdAt: string): UserBadge => {
  const now = new Date();
  const userCreatedAt = new Date(createdAt);
  const diffInMonths =
    (now.getTime() - userCreatedAt.getTime()) / (1000 * 60 * 60 * 24 * 30);

  if (diffInMonths >= 120) {
    // 10 years
    return {
      name: "IMMORTAL",
      badgeClass: "badge-immortal animate-cosmic",
      description: "A mythical being with cosmic powers, 10+ years of wisdom",
    };
  } else if (diffInMonths >= 84) {
    // 7 years
    return {
      name: "CELESTIAL",
      badgeClass: "badge-celestial animate-aurora",
      description: "Ascended to celestial status after 7+ years",
    };
  } else if (diffInMonths >= 60) {
    // 5 years
    return {
      name: "LEGENDARY",
      badgeClass: "badge-legendary animate-flames",
      description: "A true veteran blazing with 5+ years of glory",
    };
  } else if (diffInMonths >= 36) {
    // 3 years
    return {
      name: "MASTER",
      badgeClass: "badge-master animate-sparkle",
      description: "Mastered the craft over 3+ years",
    };
  } else if (diffInMonths >= 24) {
    // 2 years
    return {
      name: "VETERAN",
      badgeClass: "badge-veteran animate-shine",
      description: "Battle-hardened veteran of 2+ years",
    };
  } else if (diffInMonths >= 18) {
    // 1.5 years
    return {
      name: "EXPERT",
      badgeClass: "badge-expert animate-pulse",
      description: "Skilled expert with 1.5+ years of mastery",
    };
  } else if (diffInMonths >= 12) {
    // 1 year
    return {
      name: "PRO",
      badgeClass: "badge-pro animate-glow",
      description: "Professional with 1+ year of dedication",
    };
  } else if (diffInMonths >= 6) {
    // 6 months
    return {
      name: "INTERMEDIATE",
      badgeClass: "badge-intermediate animate-fade",
      description: "Rising star for 6+ months",
    };
  } else if (diffInMonths >= 3) {
    // 3 months
    return {
      name: "APPRENTICE",
      badgeClass: "badge-apprentice",
      description: "Dedicated learner for 3+ months",
    };
  } else if (diffInMonths >= 1) {
    // 1 month
    return {
      name: "BEGINNER",
      badgeClass: "badge-beginner",
      description: "Started their journey",
    };
  } else {
    return {
      name: "ROOKIE",
      badgeClass: "badge-rookie",
      description: "Fresh and ready to start",
    };
  }
};
