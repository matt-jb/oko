## Zadanie 1

Znajduje się [tutaj](https://github.com/matt-jb/oko/blob/master/zadanie-1/zadanie1.ts "tutaj").

## Zadanie 2

### Routes

**GET** `/transactions`
Zwraca wszystkie transakcje z lokalnego pliku CSV.

**GET** `/transactions/page/[page_number]`
Zwraca paginowane transakcje z danej strony (strony liczymy od zera).

**GET** `/transaction/[id]`
Zwraca pojedynczą transakcję. Nie było tego w poleceniu, ale taki route w praktyce właściwie zawsze się pojawia i napisanie go trwało jakieś 4 minuty ;) `id` może być dowolnym stringiem, ale w przykładowym CSV używałem kolejnych liczb naturalnych, więc można przetestować w ten sposób (licząc od 1).

**POST** `/transaction`
Dodaje pojedynczą transakcję i zapisuje do pliku CSV. W odpowiedzi zwraca dodane dane.

Wymagane body requestu:

- `id`: dowolny string. Appka zwróci błąd, jeżeli dane ID już będzie istniało.
- `date`: data, musi być w dowolnym formacie zgodnym z [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601 "ISO 8601"), inaczej aplikacja zwróci error, ponieważ nie przejdzie walidacji.
- `status`: boolean.

### Kilka notatek

- Appka jest silnie otypowana, bo fajnie jest wtedy.
- Napisałem własny, bardzo prosty walidator, można go podejrzeć [tutaj](https://github.com/matt-jb/oko/blob/master/src/utils/Validator.ts "tutaj"). Starałem się wymyślić jak najwięcej edge-cases, które są pokryte.
- Zgodnie z poleceniami przetestowane są Service oraz Repository. Żeby pokrycie testów było 100%, trzeba by oczywiście przetestować jeszcze utilsy.
- Helpery zawierają dwie globalne stałe.
