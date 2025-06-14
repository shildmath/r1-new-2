/**
 * List of IANA official time zones (for dropdown usage)
 * Source: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export const IANA_TIME_ZONES = [
  // UTC
  "UTC",
  // USA time zones
  "America/New_York",     // Eastern
  "America/Detroit",      // Eastern (Michigan)
  "America/Kentucky/Louisville", // Eastern (KY)
  "America/Kentucky/Monticello", // Eastern (KY)
  "America/Indiana/Indianapolis", // Eastern (Indiana)
  "America/Indiana/Vincennes",
  "America/Indiana/Winamac",
  "America/Indiana/Marengo",
  "America/Indiana/Petersburg",
  "America/Indiana/Vevay",
  "America/Indiana/Tell_City",
  "America/Indiana/Knox",
  "America/Chicago",      // Central
  "America/Indiana/Knox", // Central (Indiana)
  "America/Menominee",    // Central (Michigan)
  "America/North_Dakota/Center", // Central (ND)
  "America/North_Dakota/New_Salem",
  "America/North_Dakota/Beulah",
  "America/Denver",       // Mountain
  "America/Boise",        // Mountain (Idaho)
  "America/Phoenix",      // Arizona (no DST)
  "America/Los_Angeles",  // Pacific
  "America/Anchorage",    // Alaska
  "America/Juneau",       // Alaska - Juneau
  "America/Sitka",        // Alaska - Sitka
  "America/Metlakatla",   // Alaska - Metlakatla
  "America/Yakutat",      // Alaska - Yakutat
  "America/Nome",         // Alaska - Nome
  "America/Adak",         // Aleutian
  "Pacific/Honolulu",     // Hawaii
  // UK time zones
  "Europe/London",
  "Europe/Belfast",
  "Europe/Guernsey",
  "Europe/Isle_of_Man",
  "Europe/Jersey",
  // Other international
  "Europe/Berlin",
  "Europe/Paris",
  "Europe/Moscow",
  "Asia/Tokyo",
  "Asia/Hong_Kong",
  "Asia/Singapore",
  "Asia/Kolkata",
  "Asia/Jakarta",
  "Australia/Sydney",
  "Australia/Perth",
  "Pacific/Auckland",
  // ... (add more as needed for your app/audience)
];
