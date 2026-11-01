import { Component, Suspense, type CSSProperties, type ReactNode } from "react";

interface Props {
  owner: string; // e.g. "catalog · localhost:3001"
  color: string;
  children: ReactNode;
}

class ErrorBoundary extends Component<{ owner: string; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p className="frame__error">
        Couldn’t load {this.props.owner}. Check that it’s running, then reload the page.
      </p>
    ) : (
      this.props.children
    );
  }
}

// Outlines each remote in its owner's colour, so you can see where one team's UI ends.
export default function RemoteBoundary({ owner, color, children }: Props) {
  return (
    <section className="frame" style={{ "--owner": color } as CSSProperties}>
      <span className="frame__tag">{owner}</span>
      <ErrorBoundary owner={owner}>
        <Suspense fallback={<p className="frame__loading">Loading…</p>}>{children}</Suspense>
      </ErrorBoundary>
    </section>
  );
}
