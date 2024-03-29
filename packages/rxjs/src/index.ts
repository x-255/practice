import { of, single } from "rxjs";

const source1 = of(
  { name: "Ben" },
  { name: "Tracy" },
  { name: "Laney" },
  { name: "Lily" }
);

source1
  .pipe(single((x) => x.name.startsWith("L")))
  .subscribe((x) => console.log(x));