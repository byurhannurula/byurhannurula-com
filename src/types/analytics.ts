export type AnalyticsEvent = {
  name:
    | "page_view"
    | "button_click"
    | "form_submit"
    | "form_error"
    | "content_view"
    | "external_link_click"
    | "clap_action"
    | "like_action"
    | "theme_toggle"
    | "shortcut_used";
  data: {
    [key: string]: string | boolean | number;
  };
};

export type AnalyticsEventData = {
  page_view: {
    path: string;
    title: string;
  };
  button_click: {
    buttonId: string;
    section?: string;
    action?: string;
  };
  form_submit: {
    formId: string;
    success: boolean;
  };
  form_error: {
    formId: string;
    errorType: string;
    field?: string;
  };
  content_view: {
    contentId: string;
    contentType: "blog" | "project" | "short";
    section: string;
  };
  external_link_click: {
    url: string;
    text: string;
    location: string;
  };
  clap_action: {
    postSlug: string;
    clapCount: number;
  };
  like_action: {
    postSlug: string;
    liked: boolean;
  };
  theme_toggle: {
    from: string;
    to: string;
  };
  shortcut_used: {
    key: string;
    action: string;
  };
};
