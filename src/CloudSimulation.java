import org.cloudbus.cloudsim.*;
import org.cloudbus.cloudsim.core.CloudSim;

import org.cloudbus.cloudsim.provisioners.*;

import java.util.*;

public class CloudSimulation {

    public static void simulate(int tasks) {

        try {

            int users = 1;

            Calendar calendar = Calendar.getInstance();

            boolean trace = false;

            CloudSim.init(users, calendar, trace);

            Datacenter dc =
                    createDatacenter("CloudDC");

            DatacenterBroker broker =
                    new DatacenterBroker("Broker");

            int brokerId = broker.getId();

            // CREATE VMs
            List<Vm> vmList = new ArrayList<>();

            for (int i = 0; i < 3; i++) {

                Vm vm = new Vm(
                        i,
                        brokerId,
                        1000,
                        1,
                        1024,
                        1000,
                        10000,
                        "Xen",
                        new CloudletSchedulerTimeShared()
                );

                vmList.add(vm);
            }

            broker.submitVmList(vmList);

            // CREATE CLOUDLETS
            List<Cloudlet> cloudletList =
                    new ArrayList<>();

            for (int i = 0; i < tasks; i++) {

                Cloudlet cl =
                        new Cloudlet(
                                i,
                                40000,
                                1,
                                300,
                                300,
                                new UtilizationModelFull(),
                                new UtilizationModelFull(),
                                new UtilizationModelFull()
                        );

                cl.setUserId(brokerId);

                cloudletList.add(cl);
            }

            broker.submitCloudletList(cloudletList);

            CloudSim.startSimulation();

            CloudSim.stopSimulation();

            List<Cloudlet> result =
                    broker.getCloudletReceivedList();

            System.out.println(
                    "\nCloud Simulation Results:"
            );

            for (Cloudlet c : result) {

                System.out.println(
                        "Task "
                        + c.getCloudletId()
                        + " processed in VM "
                        + c.getVmId()
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static Datacenter createDatacenter(
            String name) {

        List<Host> hostList =
                new ArrayList<>();

        List<Pe> peList =
                new ArrayList<>();

        peList.add(
                new Pe(
                        0,
                        new PeProvisionerSimple(1000)
                )
        );

        Host host =
                new Host(
                        0,
                        new RamProvisionerSimple(4096),
                        new BwProvisionerSimple(10000),
                        1000000,
                        peList,
                        new VmSchedulerTimeShared(peList)
                );

        hostList.add(host);

        DatacenterCharacteristics ch =
                new DatacenterCharacteristics(
                        "x86",
                        "Linux",
                        "Xen",
                        hostList,
                        10.0,
                        3.0,
                        0.05,
                        0.1,
                        0.1
                );

        try {

            return new Datacenter(
                    name,
                    ch,
                    new VmAllocationPolicySimple(hostList),
                    new LinkedList<>(),
                    0
            );

        } catch (Exception e) {

            e.printStackTrace();
        }

        return null;
    }
}
