function withAuthLayout(Component: any) {
  return function WrappedComponent(props: any) {
    return (
      <div className="flex flex-row">
        <main className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-[#d8d868] to-[#72c93c] pb-10">
          <Component {...props} />
        </main>
      </div>
    );
  };
}

export default withAuthLayout;
