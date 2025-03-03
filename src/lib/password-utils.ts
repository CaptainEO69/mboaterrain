
export const passwordStrength = (password: string): {
  score: number;
  feedback: string;
} => {
  let score = 0;
  const feedback: string[] = [];

  // Vérification de la longueur
  if (password.length < 8) {
    feedback.push("Trop court");
  } else {
    score += 1;
  }

  // Vérification des caractères spéciaux
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Ajoutez des caractères spéciaux");
  }

  // Vérification des chiffres
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("Ajoutez des chiffres");
  }

  // Vérification des lettres majuscules
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Ajoutez des lettres majuscules");
  }

  // Vérification des lettres minuscules
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Ajoutez des lettres minuscules");
  }

  let feedbackText = "";
  
  if (score === 0 || score === 1) {
    feedbackText = "Mot de passe faible";
  } else if (score === 2 || score === 3) {
    feedbackText = "Mot de passe moyen";
  } else if (score === 4) {
    feedbackText = "Mot de passe fort";
  } else if (score === 5) {
    feedbackText = "Mot de passe très fort";
  }

  if (feedback.length > 0 && score < 4) {
    feedbackText += `: ${feedback.join(", ")}`;
  }

  return { score, feedback: feedbackText };
};
