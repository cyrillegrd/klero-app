export function getRoutineBadges(
  completedRoutines: number
) {
  const badges: string[] = [];

  if (completedRoutines >= 1)
    badges.push("🌱 Première routine");

  if (completedRoutines >= 5)
    badges.push("⭐ 5 routines");

  if (completedRoutines >= 25)
    badges.push("🏆 25 routines");

  if (completedRoutines >= 100)
    badges.push("🦕 100 routines");

  return badges;
}