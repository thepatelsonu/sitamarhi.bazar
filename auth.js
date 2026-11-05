import { supabase } from "./supabase-client.js";

const showMessage = (element, message, isError = false) => {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle("error-message", isError);
  element.classList.toggle("success-message", !isError);
};

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  const message = document.getElementById("authMessage");
  supabase.auth.getUser().then(({ data }) => {
    if (data.user) window.location.replace("merchant-dashboard.html");
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = loginForm.querySelector("button[type=submit]");
    button.disabled = true;
    button.textContent = "Signing in...";
    const form = new FormData(loginForm);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")).trim(),
      password: String(form.get("password"))
    });
    if (error) {
      showMessage(message, error.message, true);
      button.disabled = false;
      button.textContent = "Sign in";
      return;
    }
    window.location.replace("merchant-dashboard.html");
  });
}

const dashboard = document.getElementById("merchantDashboard");
if (dashboard) {
  const message = document.getElementById("dashboardMessage");
  const signOutButton = document.getElementById("signOutButton");
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value || "Not provided";
  };

  const loadDashboard = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      window.location.replace("login.html?next=merchant-dashboard.html");
      return;
    }
    setText("merchantEmail", user.email);
    const { data: profile, error } = await supabase
      .from("merchant_profiles")
      .select("business_name, owner_name, phone, category, area, status, created_at")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      showMessage(message, "We couldn't load your business profile. Please refresh or contact support.", true);
      return;
    }
    if (!profile) {
      showMessage(message, "Your account is active, but the merchant profile is not available. Please contact support.", true);
      return;
    }
    setText("businessName", profile.business_name);
    setText("ownerName", profile.owner_name);
    setText("businessPhone", profile.phone);
    setText("businessCategory", profile.category);
    setText("businessArea", profile.area);
    const status = document.getElementById("merchantStatus");
    status.textContent = profile.status.charAt(0).toUpperCase() + profile.status.slice(1);
    status.dataset.status = profile.status;
    showMessage(message, profile.status === "approved"
      ? "Your business listing has been approved."
      : profile.status === "rejected"
        ? "Your listing needs changes. Please contact the Sitamarhi Bazar team."
        : "Your registration is submitted and awaiting review.");
  };

  signOutButton?.addEventListener("click", async () => {
    signOutButton.disabled = true;
    const { error } = await supabase.auth.signOut();
    if (error) {
      showMessage(message, error.message, true);
      signOutButton.disabled = false;
      return;
    }
    window.location.replace("login.html");
  });
  loadDashboard();
}
