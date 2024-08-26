export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const authenticatedUser = await getLoggedInUser();

  //   if (!authenticatedUser) redirect('/sign-in');

  return (
    <main className='flex h-screen w-full '>
      {/* <SideBar user={authenticatedUser} /> */}

      <div className='flex size-full flex-col'>{children}</div>
    </main>
  );
}
