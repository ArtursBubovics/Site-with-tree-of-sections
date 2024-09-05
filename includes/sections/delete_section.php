<?php

session_start();

require '../db.php';

header('Content-Type: application/json'); 

if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo json_encode(['error' => 'User not authenticated']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['sectionId'])) {
        $sectionId = intval($data['sectionId']);
        $userId = $_SESSION['user_id'];

        function deleteSectionAndChildren($conn, $sectionId, $userId) {
            $stmt = $conn->prepare('SELECT id FROM sections WHERE parent_id = ? AND user_id = ?');
            if ($stmt === false) {
                echo json_encode(['error' => 'Failed to prepare SQL statement']);
                exit();
            }
            $stmt->bind_param('ii', $sectionId, $userId);
            $stmt->execute();
            $result = $stmt->get_result();

            while ($row = $result->fetch_assoc()) {
                deleteSectionAndChildren($conn, $row['id'], $userId);
            }

            $stmt->close();

            $stmt = $conn->prepare('DELETE FROM sections WHERE id = ? AND user_id = ?');
            if ($stmt === false) {
                echo json_encode(['error' => 'Failed to prepare SQL statement']);
                exit();
            }

            $stmt->bind_param('ii', $sectionId, $userId);
            $stmt->execute();
            $stmt->close();
        }

        deleteSectionAndChildren($conn, $sectionId, $userId);

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Invalid input']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
