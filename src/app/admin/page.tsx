import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">Admin Dashboard</h1>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader>
                    <CardTitle>Total Users</CardTitle>
                    <CardDescription>2,350</CardDescription>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Agreements Created</CardTitle>
                    <CardDescription>1,890</CardDescription>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                    <CardDescription>12</CardDescription>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Revenue</CardTitle>
                    <CardDescription>₹4,50,000</CardDescription>
                </CardHeader>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Agreements</CardTitle>
              <CardDescription>A list of the most recently created agreements.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agreement ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>AG-1890</TableCell>
                        <TableCell>Rohan Sharma</TableCell>
                        <TableCell>Rental Agreement</TableCell>
                        <TableCell><Badge>Completed</Badge></TableCell>
                        <TableCell>2023-10-26</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>AG-1889</TableCell>
                        <TableCell>Priya Mehta</TableCell>
                        <TableCell>Leave & License</TableCell>
                        <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                        <TableCell>2023-10-25</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>AG-1888</TableCell>
                        <TableCell>Anil Kumar</TableCell>
                        <TableCell>Partnership Deed</TableCell>
                        <TableCell><Badge>Completed</Badge></TableCell>
                        <TableCell>2023-10-25</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>AG-1887</TableCell>
                        <TableCell>Sunita Devi</TableCell>
                        <TableCell>Affidavit</TableCell>
                        <TableCell><Badge variant="destructive">Rejected</Badge></TableCell>
                        <TableCell>2023-10-24</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
