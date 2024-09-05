<?php

session_start();

require '../db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo json_encode(['error' => 'User not authenticated']);
    exit();
}

$userId = $_SESSION['user_id'];

$stmt = $conn->prepare('SELECT COUNT(*) as count FROM sections WHERE user_id = ?');
if ($stmt === false) {
    echo json_encode(['error' => 'Failed to prepare SQL statement']);
    exit();
}

$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

$stmt->close();

$hasSections = $row['count'] > 0;
echo json_encode(['hasSections' => $hasSections]);
?>