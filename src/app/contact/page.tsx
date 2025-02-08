import React from "react";

function ContactPage() {
  return (
    <div className="flex min-h-[80svh] items-center justify-center">
      <div className="flex w-[300px] flex-col gap-6 p-4 lg:w-[500px]">
        <h1 className="text-xl">Contact Us</h1>
        <div className="flex w-full flex-col gap-4">
          <input
            placeholder="Your E-mail"
            type="email"
            className="rounded border border-slate-500 p-3"
            required
          />
          <textarea
            required
            name=""
            id=""
            placeholder="Send us feedback . . . . ."
            className="w-full resize-none rounded border border-slate-500 p-3"
            rows={10}
          ></textarea>
        </div>
        <button className="btn bg-black text-white">SEND</button>
      </div>
    </div>
  );
}

export default ContactPage;
