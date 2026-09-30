import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="section container empty-state">
      <Eyebrow>404 / Page not found</Eyebrow>
      <h1>
        A different path
        <br />
        might help.
      </h1>
      <p>
        We couldn’t find that page. Explore our work or return to the homepage.
      </p>
      <Button href="/">Return home</Button>
    </section>
  );
}
