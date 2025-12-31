import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telRegex = /^\+?[0-9\s\-()]{7,}$/;

const LandingDownloadSection = () => {
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
  });

  const [errors, setErrors] = useState({}); // { nome: "msg", ... }
  const [touched, setTouched] = useState({}); // { nome: true, ... }

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));

    // Se il campo è già stato "toccato", ricalcola l’errore live
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateField = (name, value) => {
    const v = (value ?? "").trim();

    if (name === "nome") {
      if (!v) return "Il nome è obbligatorio.";
      return "";
    }

    if (name === "cognome") {
      if (!v) return "Il cognome è obbligatorio.";
      return "";
    }

    if (name === "email") {
      if (!v) return "L’email è obbligatoria.";
      if (!emailRegex.test(v)) return "Inserisci un’email valida.";
      return "";
    }

    if (name === "telefono") {
      if (!v) return "Il telefono è obbligatorio.";
      if (!telRegex.test(v)) return "Inserisci un numero di telefono valido.";
      return "";
    }
  };

  const validateAll = () => {
    const nextErrors = {
      nome: validateField("nome", form.nome),
      cognome: validateField("cognome", form.cognome),
      email: validateField("email", form.email),
      telefono: validateField("telefono", form.telefono),
    };

    // rimuove chiavi vuote
    Object.keys(nextErrors).forEach((k) => {
      if (!nextErrors[k]) delete nextErrors[k];
    });

    return nextErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // segna tutti come touched per mostrare gli errori
    setTouched({ nome: true, cognome: true, email: true, telefono: true });

    const nextErrors = validateAll();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setForm({ nome: "", cognome: "", email: "", telefono: "" });

    // ✅ invio dati (API / Mailchimp / etc)
    console.log("OK submit:", form);
  };

  return (
    <section id="download" className="bg-gray-100 px-5 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-xs tracking-[0.28em] text-slate-900/50 sm:text-sm">
            SCARICA ORA
          </p>

          <h2 className="mt-4 font-serif text-[clamp(34px,4.2vw,56px)] leading-[1.05] text-slate-900/85">
            Inizia il tuo viaggio{" "}
            <span className="italic text-[#1f3865]/90">
              verso foto indimenticabili
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-900/55 sm:text-lg">
            Lascia i tuoi dati e riceverai immediatamente l&apos;ebook gratuito
            direttamente nella tua casella email
          </p>
        </div>

        <form noValidate onSubmit={onSubmit} className="mt-10 space-y-7">
          <Field
            label="Nome"
            required
            name="nome"
            placeholder="Il tuo nome"
            value={form.nome}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.nome ? errors.nome : ""}
          />

          <Field
            label="Cognome"
            required
            name="cognome"
            placeholder="Il tuo cognome"
            value={form.cognome}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.cognome ? errors.cognome : ""}
          />

          <Field
            label="Email"
            required
            type="email"
            name="email"
            placeholder="la.tua@email.com"
            value={form.email}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.email ? errors.email : ""}
          />

          <Field
            label="Telefono"
            required
            name="telefono"
            placeholder="+39 123 456 7890"
            value={form.telefono}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.telefono ? errors.telefono : ""}
          />

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-sm bg-[#1f3865] px-6 py-4 text-sm font-semibold tracking-wide text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3865]/40"
          >
            SCARICA L&apos;EBOOK GRATUITO
          </button>

          <p className="text-center text-sm leading-6 text-slate-900/45">
            Cliccando su &quot;Scarica&quot; accetti la nostra privacy policy.
            Non condivideremo mai i tuoi dati con terzi.
          </p>
        </form>
      </div>
    </section>
  );
};

export default LandingDownloadSection;

function Field({
  label,
  required,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  error,
}) {
  const hasError = Boolean(error);

  const inputBase =
    "w-full border bg-white/30 px-4 py-4 text-base text-slate-900/70 placeholder:text-slate-900/35 focus:outline-none focus:ring-2";
  const inputOk = "border-slate-900/10 focus:ring-[#1f3865]/25";
  const inputErr = "border-red-500 focus:ring-red-500/25";

  return (
    <div className="space-y-2">
      <label className="block text-base text-slate-900/70">
        {label} {required && <span className="text-slate-900/60">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={`${inputBase} ${hasError ? inputErr : inputOk}`}
      />

      {hasError && (
        <p id={`${name}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
